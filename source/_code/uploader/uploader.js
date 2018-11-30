class uploader {
  constructor(){

  }


  addFiles: function (files, evt) {
    var _files = []
    var oldFileListLen = this.fileList.length
    utils.each(files, function (file) {
      // Uploading empty file IE10/IE11 hangs indefinitely
      // Directories have size `0` and name `.`
      // Ignore already added files if opts.allowDuplicateUploads is set to false
      if ((!ie10plus || ie10plus && file.size > 0) && !(file.size % 4096 === 0 && (file.name === '.' || file.fileName === '.'))) {
        var uniqueIdentifier = this.generateUniqueIdentifier(file)
        if (this.opts.allowDuplicateUploads || !this.getFromUniqueIdentifier(uniqueIdentifier)) {
          var _file = new File(this, file, this)
          _file.uniqueIdentifier = uniqueIdentifier
          if (this._trigger('fileAdded', _file, evt)) {
            _files.push(_file)
          } else {
            File.prototype.removeFile.call(this, _file)
          }
        }
      }
    }, this)
    // get new fileList
    var newFileList = this.fileList.slice(oldFileListLen)
    if (this._trigger('filesAdded', _files, newFileList, evt)) {
      utils.each(_files, function (file) {
        if (this.opts.singleFile && this.files.length > 0) {
          this.removeFile(this.files[0])
        }
        this.files.push(file)
      }, this)
      this._trigger('filesSubmitted', _files, newFileList, evt)
    } else {
      utils.each(newFileList, function (file) {
        File.prototype.removeFile.call(this, file)
      }, this)
    }
  },


  uploadNextChunk: function (preventEvents) {
    var found = false
    var pendingStatus = Chunk.STATUS.PENDING

    // 可选的函数用于根据 XHR 响应内容检测每个块是否上传成功了，
    // 传入的参数是：Uploader.Chunk实例以及请求响应信息。这样就没必要上传（测试）所有的块了，
    var checkChunkUploaded = this.uploader.opts.checkChunkUploadedByResponse

    // 对于文件而言是否高优先级发送第一个和最后一个块。
    if (this.opts.prioritizeFirstAndLastChunk) {
      utils.each(this.files, function (file) {
        if (file.paused) {
          return
        }
        if (checkChunkUploaded && !file._firstResponse && file.isUploading()) {
          // waiting for current file's first chunk response
          return
        }
        if (file.chunks.length && file.chunks[0].status() === pendingStatus) {
          file.chunks[0].send()
          found = true
          return false
        }
        if (file.chunks.length > 1 && file.chunks[file.chunks.length - 1].status() === pendingStatus) {
          file.chunks[file.chunks.length - 1].send()
          found = true
          return false
        }
      })
      if (found) {
        return found
      }
    }

    // Now, simply look for the next, best thing to upload
    utils.each(this.files, function (file) {
      if (!file.paused) {
        if (checkChunkUploaded && !file._firstResponse && file.isUploading()) {
          // waiting for current file's first chunk response
          return
        }
        utils.each(file.chunks, function (chunk) {
          if (chunk.status() === pendingStatus) {
            chunk.send()
            found = true
            return false
          }
        })
      }
      if (found) {
        return false
      }
    })
    if (found) {
      return true
    }

    // The are no more outstanding chunks to upload, check is everything is done
    var outstanding = false
    utils.each(this.files, function (file) {
      if (!file.isComplete()) {
        outstanding = true
        return false
      }
    })
    // should check files now
    // if now files in list
    // should not trigger complete event
    if (!outstanding && !preventEvents && this.files.length) {
      // All chunks have been uploaded, complete
      this._triggerAsync('complete')
    }
    return outstanding
  },

  upload: function (preventEvents) {
    // Make sure we don't start too many uploads at once
    // 判断是否应该上传，如应该，返回当前正在上传的chunk数
    var ret = this._shouldUploadNext()
    if (ret === false) {
      return
    }
    !preventEvents && this._trigger('uploadStart')
    var started = false
    for (var num = 1; num <= this.opts.simultaneousUploads - ret; num++) {
      started = this.uploadNextChunk(!preventEvents) || started
      if (!started && preventEvents) {
        // completed
        break
      }
    }
    if (!started && !preventEvents) {
      this._triggerAsync('complete')
    }
  },

  /**
   * 判断是否应该上传，如应该，返回当前正在上传的chunk数
   * @function
   * @returns {Boolean|Number}
   */
  _shouldUploadNext: function () {
    var num = 0
    var should = true
    var simultaneousUploads = this.opts.simultaneousUploads
    var uploadingStatus = Chunk.STATUS.UPLOADING
    utils.each(this.files, function (file) {
      utils.each(file.chunks, function (chunk) {
        if (chunk.status() === uploadingStatus) {
          num++
          if (num >= simultaneousUploads) {
            should = false
            return false
          }
        }
      })
      return should
    })
    // if should is true then return uploading chunks's length
    return should && num
  },


  /**
   * Assign a browse action to one or more DOM nodes.
   * @function
   * @param {Element|Array.<Element>} domNodes
   * @param {boolean} isDirectory Pass in true to allow directories to
   * @param {boolean} singleFile prevent multi file upload
   * @param {Object} attributes set custom attributes:
   *  http://www.w3.org/TR/html-markup/input.file.html#input.file-attributes
   *  eg: accept: 'image/*'
   * be selected (Chrome only).
   */
  assignBrowse: function (domNodes, isDirectory, singleFile, attributes) {
    if (typeof domNodes.length === 'undefined') {
      domNodes = [domNodes]
    }

    utils.each(domNodes, function (domNode) {
      var input
      if (domNode.tagName === 'INPUT' && domNode.type === 'file') {
        input = domNode
      } else {
        input = document.createElement('input')
        input.setAttribute('type', 'file')
        // display:none - not working in opera 12
        utils.extend(input.style, {
          visibility: 'hidden',
          position: 'absolute',
          width: '1px',
          height: '1px'
        })
        // for opera 12 browser, input must be assigned to a document
        domNode.appendChild(input)
        // https://developer.mozilla.org/en/using_files_from_web_applications)
        // event listener is executed two times
        // first one - original mouse click event
        // second - input.click(), input is inside domNode
        domNode.addEventListener('click', function (e) {
          if (domNode.tagName.toLowerCase() === 'label') {
            return
          }
          input.click()
        }, false)
      }
      if (!this.opts.singleFile && !singleFile) {
        input.setAttribute('multiple', 'multiple')
      }
      if (isDirectory) {
        input.setAttribute('webkitdirectory', 'webkitdirectory')
      }
      attributes && utils.each(attributes, function (value, key) {
        input.setAttribute(key, value)
      })
      // When new files are added, simply append them to the overall list
      var that = this
      input.addEventListener('change', function (e) {
        that._trigger(e.type, e)
        if (e.target.value) {
          that.addFiles(e.target.files, e)
          e.target.value = ''
        }
      }, false)
    }, this)
  }



}


// 因为有事件机制，所以需要一个事件系统
// mixin 事件系统
// 方法很容易整合到prototype

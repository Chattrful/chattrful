'use strict'

import KTUtil from 'metronic/components/util'
import KTLayoutHeader from 'metronic/layout/base/header'
import KTLayoutSubheader from 'metronic/layout/base/subheader'
import KTLayoutFooter from 'metronic/layout/base/footer'

var KTLayoutContent = (function () {
  // Private properties
  var _element

  // Private functions
  var _getHeight = function () {
    var height

    height = KTUtil.getViewPort().height

    if (_element) {
      height =
        height -
        parseInt(KTUtil.css(_element, 'paddingTop')) -
        parseInt(KTUtil.css(_element, 'paddingBottom'))
    }

    height = height - KTLayoutHeader.getHeight()
    height = height - KTLayoutSubheader.getHeight()
    height = height - KTLayoutFooter.getHeight()

    return height
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id)
    },

    getHeight: function () {
      return _getHeight()
    },

    getElement: function () {
      return _element
    }
  }
})()

export default KTLayoutContent

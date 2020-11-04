var Breakpoints = (function () {
  return {
    isMobileOrTablet: function() {
      return window.innerWidth < 992
    }
  }
})()

export default Breakpoints

exports.onRouteUpdate = ({
    location
}) => {
}
exports.onClientEntry = () => {
	if (!('ontouchstart' in document.documentElement)) {
		document.body.classList.add('onhover');
    }
}
// DELAY SCROLL UPDATE

const transitionDelay = 2000

exports.shouldUpdateScroll = ({
    routerProps: {
        location
    },
    getSavedScrollPosition,
}) => {
    if (location.action === 'PUSH') {
        window.setTimeout(() => window.scrollTo(0, 0), transitionDelay)
    } else {
        const savedPosition = getSavedScrollPosition(location)
        window.setTimeout(
            () => window.scrollTo(...(savedPosition || [0, 0])),
            transitionDelay
        )
    }
    return false
}

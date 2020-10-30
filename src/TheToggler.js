(global => {
	const DEFAULT_OPTIONS = {
		activateWith: 'attr',
		activeKey: 'data-active',
		activeByDefault: false,
		deactivateWhenClickTargets: false,
		deactivateWhenClickOutTargets: false,
	}

	const TheToggler = (toggler, targets, options) => new TheToggler.init(toggler, targets, options);

	TheToggler.init = function (toggler, targets, options = {}) {
		this.toggler = typeof toggler === 'string'
			? document.querySelector(toggler)
			: toggler

		this.targets = typeof targets === 'string'
			? [...document.querySelectorAll(targets)]
			: targets.map(target => document.querySelector(target))

		this.initOptions(options);
		this.handleClick();
	}

	TheToggler.prototype = {
		options: undefined,
		isActive: false,
		debounceID: undefined,
	}

	TheToggler.prototype.handleClick = function () {
		document.addEventListener('click', event => {
			const {deactivateWhenClickTargets, deactivateWhenClickOutTargets} = this.options;

			// Check if toggler was clicked
			const USER_CLICKED_TOGGLER = this.toggler.contains(event.target)

			// Check if targets were clicked
			// If targets were clicked, filtered array will have at least 1 element
			const USER_CLICKED_TARGET = this.targets.filter(target => target.contains(event.target)).length !== 0

			if (USER_CLICKED_TOGGLER)
				return this.toggleActive()

			if (this.isActive && deactivateWhenClickTargets && USER_CLICKED_TARGET)
				return this.toggleActive()

			// Check if there are clicks outside of toggler and targets when items are clicked
			if (this.isActive && deactivateWhenClickOutTargets && (!USER_CLICKED_TARGET || USER_CLICKED_TOGGLER))
				return this.toggleActive()
		})
	}

	TheToggler.prototype.toggleActive = function () {
		this.options.activateWith === 'attr'
			? this.toggleWithAttr()
			: this.toggleWithClass()

		this.isActive = !this.isActive
	}

	TheToggler.prototype.toggleWithClass = function () {
		[this.toggler, ...this.targets].map(el => {
			this.isActive
				? el.classList.remove(this.options.activeKey)
				: el.classList.add(this.options.activeKey)
		})
	}

	TheToggler.prototype.toggleWithAttr = function () {
		[this.toggler, ...this.targets].map(el => {
			this.isActive
				? el.removeAttribute(this.options.activeKey)
				: el.setAttribute(this.options.activeKey, '')
		})
	}

	// Check options given in TheToggler function
	// Any missing option will default to DEFAULT_OPTIONS
	TheToggler.prototype.initOptions = function (options) {
		this.options = {
			...DEFAULT_OPTIONS,
			...options,
		}

		if (this.options.activeByDefault)
			this.toggleActive()
	}

	const debounce = function (id, fn, delay) {
		clearTimeout(id)
		id = setTimeout(fn, delay)
	}
	TheToggler.init.prototype = TheToggler.prototype;
	global.TheToggler = TheToggler;
})(window)
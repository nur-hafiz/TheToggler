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
		options: DEFAULT_OPTIONS,
		isActive: false,
		debounceID: undefined,
	}

	TheToggler.prototype.handleClick = function () {
		document.addEventListener('click', event => {
			// Check if toggler was clicked
			const USER_CLICKED_TOGGLER = this.toggler.contains(event.target)

			// Check if targets were clicked
			// If targets were clicked, filtered array will have at least 1 element
			const USER_CLICKED_TARGET = this.targets.filter(target => target.contains(event.target)).length !== 0

			if (USER_CLICKED_TOGGLER)
				return this.toggleActive()

			if (this.isActive && this.options.deactivateWhenClickTargets && USER_CLICKED_TARGET)
				return this.toggleActive()

			// Check if there are clicks outside of toggler and targets when items are clicked
			if (this.isActive && this.options.deactivateWhenClickOutTargets && (!USER_CLICKED_TARGET || USER_CLICKED_TOGGLER))
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
		for (let key in DEFAULT_OPTIONS) {
			if (options.hasOwnProperty(key))
				this.options[key] = options[key]
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
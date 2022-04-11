export class ConveyorBelt<T> {
	private _iterator: Iterator<T>
	private _current: T | null
	constructor(arrayLike: Iterable<T>) {
		this._current = null
		this._iterator = arrayLike[Symbol.iterator]()
		this.take()
	}
	public get current() {
		return this._current
	}
	public take() {
		const old = this._current
		const { done, value } = this._iterator.next()
		if (done) return null
		this._current = value
		return old
	}
	public takeWhile(checker: (item: T) => boolean) {
		const progress = (): string =>
			(item =>
				item !== null && checker(item)
				 ? `${this.take()}${progress()}`
				 : ''
			)(this.current)
		return progress()
	}
}

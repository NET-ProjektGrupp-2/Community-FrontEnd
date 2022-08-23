import DataInterface from "./DataInterface";
import { Settings_EntiresPerPage as PageSize } from "GlobalConst";

export default class ChronologicalList<T extends DataInterface> {
	First: ListNode<T> | null = null;
	Last: ListNode<T> | null = null;
	Nodes = new Map<T, ListNode<T>>();
	private Pages = new Array<ListPage<T>>();

	Clear() {
		this.First = null;
		this.Last = null;
		this.Nodes = new Map<T, ListNode<T>>();
		this.Pages = new Array<ListPage<T>>();
	}
	AddAll(items: T[]) {
		if (items.length === 0) return;
		if (this.Nodes.size === 0) this.Add(items.pop()!);
		items.reverse();
		items.forEach(item => {
			let newNode = new ListNode(item);
			this.Insert(newNode);
			this.Nodes.set(newNode.Item, newNode);
		});
		if (this.Pages.length > 0) {
			this.GeneratePages();
		}
	}
	Add(item: T) {
		if (this.Nodes.has(item)) {
			return;
		}
		let newNode = new ListNode<T>(item);;
		if (!this.First) {
			this.First = this.Last = newNode;
			this.Nodes.set(item, newNode);
			return;
		}

		this.Insert(newNode);
	}
	private Insert(newNode: ListNode<T>) {
		if (this.First!.Time < newNode.Time) {
			this.First!.InsertAhead(newNode);
			this.First = newNode;
			return;
		}
		let nextNode = this.First;
		while (nextNode) {
			if (nextNode.Time < newNode.Time) {
				nextNode.InsertAhead(newNode);
				return;
			}
			else nextNode = nextNode.Next;
		}
		this.Last!.InsertBehind(newNode);
		this.Last = newNode;
		return;
	}
	Update(item: T) {
		let node;
		if ((node = this.Nodes.get(item))) {
			if (node.Update()) {
				this.Insert(node);
				this.UpdatePages(node);
			}
		}
	}
	private UpdatePages(node: ListNode<T>) {
		if (this.Pages.length === 0) return;
		if (this.First === node) {
			let originalPage = node.Page;
			for (const page of this.Pages) {
				if(!page.NudgeUp()){
					let newPage = new ListPage<T>();
					this.Pages.push(newPage);
					newPage.SetStart(page.Last.Next!);
					break;
				}
				if (page === originalPage) {
					break;
				}
			}
		}
		else if (this.Last === node) {
			let lastPage = this.Pages[this.Pages.length - 1];
			if (!lastPage.Fill()) {
				let newPage = new ListPage<T>()
				this.Pages.push(newPage);
				newPage.SetStart(lastPage.Last.Next!);
			}
		}
		else {
			this.GeneratePages();
		}
		if (!this.VerifyPages()) {
			this.GeneratePages();
		}
	}
	Remove(item: T) {
		let node;
		if ((node = this.Nodes.get(item))) {
			node.Remove();
			this.Nodes.delete(item);
			if (node.Page) {
				while (!node.Page.Fill()) {

				}
			}
		}
	}
	Map<U>(mapFunction: ((item: T) => U), page: number, returnArray: U[]): boolean {
		if (!this.VerifyPages()) {
			if (!this.GeneratePages()) {
				return false;
			}
		}
		let mapPage = this.Pages[page];
		let mapNode = mapPage.First;
		while (mapNode !== mapPage.Last) {
			returnArray.push(mapFunction(mapNode.Item));
			mapNode = mapNode.Next ?? mapPage.Last;
		}
		return true;
	}
	GeneratePages() {
		if (!this.First) {
			return false;
		}
		let pages = Math.ceil(this.Nodes.size / PageSize);
		let startNode = this.First;
		this.Pages = new Array<ListPage<T>>();
		for (let index = 0; index < pages; index++) {
			let newPage = new ListPage<T>();
			newPage.SetStart(startNode);
			this.Pages.push(newPage);
			startNode = newPage.Last.Next ?? startNode;
		}
		return true;
	}
	private VerifyPages() {
		if (this.Pages.length > 0) {
			let previous = this.Pages[0];
			if (this.First !== previous.First) {
				return false;
			}
			for (let index = 1; index < this.Pages.length; index++) {
				const element = this.Pages[index];
				if (previous.Last.Next !== element.First) {
					return false;
				}
				previous = element;
			}
			return previous.Last === this.Last;
		}
		return false;
	}
}

class ListNode<T extends DataInterface>{
	InsertAhead(newNode: ListNode<T>) {
		newNode.Prev = this.Prev;
		this.Prev = newNode;
		newNode.Next = this;
	}
	InsertBehind(newNode: ListNode<T>) {
		newNode.Prev = this;
		newNode.Next = this.Next;
		this.Next = newNode;
	}
	Update() {
		this.Time = this.Item.LastModified();
		if (this.Prev) {
			if (this.Prev.Time < this.Time) {
				this.Remove();
				return true;
			}
		}
		return false;
	}
	Remove() {
		if (this.Prev) this.Prev.Next = this.Next;
		if (this.Next) this.Next.Prev = this.Prev;
		if (this.Page) {
			this.Page.RemoveNode(this);
		}
		this.Prev = null;
		this.Next = null;
	}

	constructor(data: T) {
		this.Item = data;
		this.Time = data.LastModified();
	}
	Item: T;
	Prev: ListNode<T> | null = null;
	Next: ListNode<T> | null = null;
	Time: number;
	Page?: ListPage<T>;
}

class ListPage<T extends DataInterface> {
	First!: ListNode<T>;
	Last!: ListNode<T>;
	Nodes = new Set<ListNode<T>>();

	RemoveNode(node: ListNode<T>) {
		if (node === this.First) {
			this.First = this.First.Next!;
		}
		else if (node === this.Last) {
			this.Last = this.Last.Prev!;
		}
		this.Nodes.delete(node);
	}
	NudgeUp() {
		let newFirst = this.First.Prev;
		if (!newFirst) {
			return false;
		}
		this.First = newFirst;
		newFirst.Page = this;
		this.Nodes.add(newFirst);
		if (this.Nodes.size > PageSize) {
			let nextPage = this.Last.Next?.Page;
			this.Nodes.delete(this.Last);
			this.Last = this.Last.Prev!;
			if (!nextPage) {
				return null;
			}
		}
		return true;
	}
	SetStart(node: ListNode<T>) {
		this.First = node;
		this.Nodes.clear();
		for (let index = 0; index < PageSize; index++) {
			this.Nodes.add(node);
			node.Page = this;
			node.Next ? node = node.Next : index = PageSize;
		}
		this.Last = node;
	}
	Fill() {
		while (this.Nodes.size < PageSize) {
			let nextNode = this.Last.Next;
			if (nextNode) {
				this.Nodes.add(nextNode);
				nextNode.Page = this;
				this.Last = nextNode;
			}
			else {
				return true;
			}
		}
		if (this.Last.Next) {
			return false;
		}
		return true;
	}
}
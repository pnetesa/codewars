const { deepEqual, expect } = require('../util/test');

// Создайте очередь, в которой буду реализованы операции на добавление элементов в конец очереди,
// удаление первого элемента и вычисление размера очереди с сложностью алгоритма О(1) .

class Queue {
  first;
  last;
  size = 0;

  // todo: добавить элемент в конец очереди
  enqueue(item) {
    const newItem = {
      value: item,
      next: null,
    }

    if (!this.first) {
      this.first = newItem;
    }

    if (this.last) {
      this.last.next = newItem;
    }

    this.last = newItem;
    this.size = this.size + 1;
    return this;
  }

  // todo: удалить первый элемент из очереди
  dequeue() {
    if (this.size === 0) {
      return;
    }

    const first = this.first;
    this.first = this.first.next;
    first.next = null;
    this.size = this.size > 0 ? this.size - 1 : 0;
    return first.value;
  }

  // todo: возвращает размер списка
  // нельзя использовать геттер
  get size() {
    this.size;
  }
}

const queue = new Queue();

const date = new Date();
queue
  .enqueue('asdf')
  .enqueue(1234)
  .enqueue(date)
  .enqueue(true)
  .enqueue({ key: '789', val: 1011 });

expect(queue.size === 5, 'queue.size === 5');
deepEqual(queue.dequeue(), 'asdf');
deepEqual(queue.dequeue(), 1234);
deepEqual(queue.dequeue(), date);
deepEqual(queue.dequeue(), true);
deepEqual(queue.dequeue(), { key: '789', val: 1011 });
deepEqual(queue.dequeue(), undefined);

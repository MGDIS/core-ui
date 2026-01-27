import { describe, expect, test, vi } from 'vitest';
import { Cursor, nextTick, Page, Paginate } from './components';
import { CursorType } from './components.conf';

const initArray = length => new Array(length).fill('').map((_, key) => (key + 1).toString());

describe('components', () => {
  describe('nextTick', () => {
    test('Should get a promise', async () => {
      const job = nextTick();
      expect(job.then).toBeDefined();

      const res = await job;
      expect(res).toBeUndefined();
    });
    test('Should wrapp and execute a callback in a promise', async () => {
      const fn = vi.fn();
      const job = nextTick(fn);
      expect(job.then).toBeDefined();

      const res = await job;
      expect(fn).toHaveBeenCalled();
      expect(res).toBeUndefined();
    });
  });
  describe('Paginate', () => {
    test('Should create Paginate instance', () => {
      const res = new Paginate([]);
      expect(res.items.length).toEqual(0);
      expect(res).toHaveProperty('getPage');
    });

    describe('getPage()', () => {
      test.each([
        {
          items: {},
          options: undefined,
        },
        {
          items: [],
          options: undefined,
        },
        {
          items: ['batman', 'robin', 'joker', 'bane', 'harley quinn', 'dante'],
          options: undefined,
        },
        {
          items: initArray(34),
          options: undefined,
        },
        {
          items: initArray(34),
          options: { top: 5 },
        },
        {
          items: initArray(34),
          options: { total: 105 },
        },
        {
          items: initArray(34),
          options: { next: '/next/page' },
        },
        {
          items: initArray(34),
          options: { next: new URL('http://url.fr/next/page') },
        },
      ])('Shoud get paginated page from instance %s', ({ items, options }) => {
        const res = new Paginate(items as unknown[], options);
        const page = res.getPage();
        expect(page).toMatchSnapshot();
      });

      test('Should filter paginated page from instance', () => {
        const res = new Paginate(['batman', 'robin', 'joker', 'bane', 'harley quinn', 'dante']);
        const page = res.getPage(0, val => val.includes('an'));
        expect(page).toMatchSnapshot();
      });

      test('Should get next() page from instance', () => {
        const res = new Paginate(initArray(20));
        // get first page
        const page = res.getPage();
        expect(page).toMatchSnapshot();
        // get next page
        const next = (page.next as unknown as () => Page<unknown>)();
        expect(next).toMatchSnapshot();
      });
    });
  });

  describe('Page', () => {
    const items = ['batman', 'robin', 'joker', 'bane', 'harley quinn', 'dante'];
    test.each([
      {
        items,
      },
      {
        items: items.map((item, index) => ({ title: item, value: index })) as unknown[],
      },
      {
        items,
        total: 100,
      },
      {
        items,
        top: 10,
      },
      {
        items,
        next: '/next/url',
      },
    ])('Should create Page instance', init => {
      const page = new Page(init);
      expect(page).toMatchSnapshot();
    });

    test('Should thrown error with invalid Page init', () => {
      expect.assertions(1);
      try {
        new Page('batman' as unknown as Record<string, string>);
      } catch (err) {
        expect(err.message).toEqual('Page - init must match IPage type.');
      }
    });

    describe('getIndexFromCursor()', () => {
      test.each([undefined, 'hello'])('Should get first index by default, cursor %s', cursor => {
        const page = new Page({ items });
        page.items.forEach(() => {
          const index = page.getIndexFromCursor(cursor as CursorType);
          expect(index).toEqual(0);
        });
      });
      describe.each(Object.values(Cursor))('cursor %s', cursor => {
        let result = 0;
        if (cursor === 'first') result = 0;
        if (cursor === 'last') result = items.length - 1;
        if (cursor === 'next') result = 1;
        if (cursor === 'previous') result = items.length - 1;
        test.each([
          {
            items: 'batman',
            result: null,
          },
          {
            items: {},
            result: null,
          },
          {
            items: [],
            result: null,
          },
          {
            items,
            result,
          },
          {
            items: items.map((item, index) => ({ title: item, value: index })) as unknown[],
            result,
          },
        ])('Sould get index from curor %s', ({ items, result }) => {
          const page = new Page({ items: items as unknown[] });
          const index = page.getIndexFromCursor(cursor);
          expect(index).toEqual(result);
        });
      });
      test('Should go to next value witdh oldValue', () => {
        const page = new Page({ items });
        for (const oldIndex in page.items) {
          const index = page.getIndexFromCursor('next', items[Number(oldIndex)]);
          const nextIndex = Number(oldIndex) + page.baseIndex;
          expect(index).toEqual(nextIndex >= page.items.length ? 0 : nextIndex);
        }
      });
      test('Should go to previous value witdh oldValue', () => {
        const page = new Page({ items });
        for (const oldIndex in page.items) {
          const index = page.getIndexFromCursor('previous', items[Number(oldIndex)]);
          const nextIndex = Number(oldIndex) - page.baseIndex;
          expect(index).toEqual(Number(oldIndex) === 0 ? page.items.length - page.baseIndex : nextIndex);
        }
      });
      test.each(['previous', 'next'])('Should get first index with unavailable item, cursor %s', cursor => {
        const page = new Page({ items });
        page.items.forEach(() => {
          const index = page.getIndexFromCursor(cursor as CursorType, 'hello');
          expect(index).toEqual(0);
        });
      });
    });
  });
});

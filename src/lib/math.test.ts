import expect from 'expect';
import { suite } from 'uvu';
import { add } from './math';

const mathSuite = suite('math');

mathSuite('math.add: should add numbers correctly', () => {
  expect(add(1, 2, 3)).toBe(6);
});

mathSuite.run();

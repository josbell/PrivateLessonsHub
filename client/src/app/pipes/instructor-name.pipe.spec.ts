import { InstructorNamePipe } from './instructor-name.pipe';

describe('InstructorNamePipe', () => {
  it('create an instance', () => {
    const pipe = new InstructorNamePipe();
    expect(pipe).toBeTruthy();
  });
});

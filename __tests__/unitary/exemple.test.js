describe('example tests with jet', () => {
  it('should some two numbers and get the result', () => {
    expect.assertions(1);
    const y = 10;
    const x = 5;
    const som = x + y;

    expect(som).toBe(15);
  });

  it('should merge two words in one', () => {
    expect.assertions(1);
    const a = 'hello';
    const b = 'world';
    const word = a + b;

    expect(word).toBe('helloworld');
  });
});

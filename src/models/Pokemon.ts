class Pokemon {
  constructor(
    public name: string,
    public url: string,
    public id?: number,
    public sprite?: string,
    public types?: string[],
  ) {}
};

export default Pokemon;

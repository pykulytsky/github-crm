export class Repository {
  constructor(
    public readonly id: string,
    public name: string,
    public owner: string,
    public url: string,
    public stars: number,
    public forks: number,
    public issues: number,
    public createdAt: Date,
    public userId: string | null = null,
  ) {}
}

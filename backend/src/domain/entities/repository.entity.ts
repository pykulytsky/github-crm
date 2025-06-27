export class Repository {
  constructor(
    public readonly id: number,
    public name: string,
    public owner: string,
    public url: string,
    public stars: number,
    public forks: number,
    public issues: number,
    public createdAt: Date,
    public addedAt: Date | null = null,
    public userId: string | null = null,
  ) {}
}

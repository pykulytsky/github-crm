import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'src/domain/entities/repository.entity';
import { IRepositoryHostingService } from 'src/domain/services/repositories-hosting.service';

@Injectable()
export class GithubService implements IRepositoryHostingService {
  private baseUrl: string;
  private apiVersion: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get('GITHUB_API_BASE_URL');
    this.apiVersion =
      this.configService.get('GITHUB_API_VERSION') || '2022-11-28';
  }

  async fetchRepository(
    owner: string,
    name: string,
  ): Promise<Repository | null> {
    try {
      const { data } = await this.http.axiosRef.get(
        this.baseUrl + `/repos/${owner}/${name}`,
        {
          headers: {
            'X-GitHub-Api-Version': this.apiVersion,
          },
        },
      );

      const repository = new Repository(
        data.id,
        data.name,
        data.owner.login,
        data.html_url,
        data.stargazers_count,
        data.forks_count,
        data.open_issues_count,
        new Date(data.created_at),
      );
      return repository;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }
}

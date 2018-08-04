import { Component } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as querystring from 'querystring';

import { SpotifyClient } from '../../spotify-client.class';
import { SpotifySearchEntityType } from '../../../enums/spotify-search-entity-type.enum';
import { SpotifyQuery } from './classes/spotify-query.class';
import { SpotifySearchResult } from './classes/spotify-search-result.class';
import { SpotifySearchResultAPIResponse } from './interfaces/spotify-search-result-api-response.interface';

/**
 * SearchService
 *
 * @export
 * @class SearchService
 */
@Component()
export class SearchService {
  /**
   * Creates an instance of SearchService.
   *
   * @param {SpotifyClient} spotifyClient
   * @memberof SearchService
   */
  constructor(private readonly spotifyClient: SpotifyClient) {}

  /**
   * Search for an Item
   *
   * @param {[SpotifyQuery|string]} query
   * @param {string} [type]
   * @param {string} [market]
   * @param {number} [limit]
   * @param {number} [offset]
   * @returns {SpotifySearchResult}
   * @memberof SearchService
   */
  public async search(
    query: SpotifyQuery | string,
    types: SpotifySearchEntityType[],
    market?: string,
    limit?: number,
    offset?: number
  ): Promise<SpotifySearchResult> {
    let response: AxiosResponse<SpotifySearchResultAPIResponse>;

    try {
      response = await this.spotifyClient.get<SpotifySearchResultAPIResponse>(
        `/search?query=${query.toString()}${
          types || market || limit || offset
            ? `&${querystring.stringify({
                type: types.toString(),
                market,
                limit,
                offset
              })}`
            : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    const searchResponse = SpotifySearchResult.fromJSON(response.data);

    return searchResponse;
  }
}

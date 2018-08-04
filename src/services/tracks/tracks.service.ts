import { Component } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { SpotifyClient } from '../../spotify-client.class';
import { SpotifyTrack } from './classes/spotify-track.class';
import { SpotifyTrackAPIResponse } from './interfaces/spotify-track-api-response.interface';

/**
 * TracksService
 *
 * @export
 * @class TracksService
 */
@Component()
export class TracksService {
  /**
   * Creates an instance of TracksService.
   *
   * @param {SpotifyClient} spotifyClient
   * @memberof TracksService
   */
  constructor(private readonly spotifyClient: SpotifyClient) {}

  /**
   * Get a Track
   *
   * @param {string} id
   * @param {string} [market]
   * @returns {Promise<SpotifyTrack>}
   * @memberof TracksController
   */
  public async getTrack(id: string, market?: string): Promise<SpotifyTrack> {
    let response: AxiosResponse<SpotifyTrackAPIResponse>;

    try {
      response = await this.spotifyClient.get<SpotifyTrackAPIResponse>(
        `/tracks?id=${id}${market ? `?market=${market}` : ''}`
      );
    } catch (error) {
      console.error(error);
    }

    const track = SpotifyTrack.fromJSON(response.data);

    return track;
  }

  /**
   * Get Several Tracks
   *
   * @param {string[]} ids
   * @param {string} [market]
   * @returns {Promise<SpotifyTrack>}
   * @memberof TracksController
   */
  public async getSeveralTracks(
    ids: string[],
    market?: string
  ): Promise<SpotifyTrack[]> {
    let response: AxiosResponse<{ tracks: SpotifyTrackAPIResponse[] }>;

    try {
      response = await this.spotifyClient.get<{
        tracks: SpotifyTrackAPIResponse[];
      }>(
        `/tracks?ids=${ids.reduce((acc, id) => acc + `,${id}`, '')}${
          market ? `?market=${market}` : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    const tracks = response.data.tracks.map(track =>
      SpotifyTrack.fromJSON(track)
    );

    return tracks;
  }
}

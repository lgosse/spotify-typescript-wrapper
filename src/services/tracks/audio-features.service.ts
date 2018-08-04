import { Component } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { SpotifyClient } from '../../spotify-client.class';
import { SpotifyAudioFeatures } from './classes/spotify-audio-features.class';
import { SpotifyAudioFeaturesAPIResponse } from './interfaces/spotify-audio-features-api-response.interface';

/**
 * AudioFeaturesService
 *
 * @export
 * @class AudioFeaturesService
 */
@Component()
export class AudioFeaturesService {
  /**
   * The SpotifyClient
   *
   * @private
   * @type {SpotifyClient}
   * @memberof AudioFeaturesService
   */
  private readonly spotifyClient: SpotifyClient;

  /**
   * Creates an instance of AudioFeaturesService.
   *
   * @memberof AudioFeaturesService
   */
  constructor() {
    this.spotifyClient = new SpotifyClient();
  }

  /**
   * Get Audio Features for a Track
   *
   * @param {string} accessToken
   * @param {string} id
   * @returns {Promise<SpotifyAudioFeatures>}
   * @memberof AudioFeaturesService
   */
  public async getTrackAudioFeatures(
    accessToken: string,
    id: string
  ): Promise<SpotifyAudioFeatures> {
    let response: AxiosResponse<SpotifyAudioFeaturesAPIResponse>;

    try {
      response = await this.spotifyClient.get<SpotifyAudioFeaturesAPIResponse>(
        `/audio-features/${id}`,
        accessToken
      );
    } catch (error) {
      console.error(error);
    }

    const audioFeatures = SpotifyAudioFeatures.fromJSON(response.data);

    return audioFeatures;
  }

  /**
   * Get Audio Features for Several Tracks
   *
   * @param {string} accessToken
   * @param {string[]} ids
   * @returns {Promise<SpotifyAudioFeatures>}
   * @memberof AudioFeaturesService
   */
  public async getSeveralTracksAudioFeatures(
    accessToken: string,
    ids: string[]
  ): Promise<SpotifyAudioFeatures[]> {
    let response: AxiosResponse<{
      audio_features: SpotifyAudioFeaturesAPIResponse[];
    }>;

    try {
      response = await this.spotifyClient.get<{
        audio_features: SpotifyAudioFeaturesAPIResponse[];
      }>(
        `/audio-features/${ids.reduce((acc, id) => acc + `,${id}`, '')}`,
        accessToken
      );
    } catch (error) {
      console.error(error);
    }

    const audioFeatures = response.data.audio_features.map(audioFeatures =>
      SpotifyAudioFeatures.fromJSON(audioFeatures)
    );

    return audioFeatures;
  }
}

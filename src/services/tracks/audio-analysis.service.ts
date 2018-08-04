import { Component } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { SpotifyClient } from '../../spotify-client.class';
import { SpotifyAudioAnalysis } from './classes/spotify-audio-analysis.class';
import { SpotifyAudioAnalysisAPIResponse } from './interfaces/spotify-audio-analysis-api-response.interface';

/**
 * AudioAnalysisService
 *
 * @export
 * @class AudioAnalysisService
 */
@Component()
export class AudioAnalysisService {
  /**
   * The SpotifyClient
   *
   * @private
   * @type {SpotifyClient}
   * @memberof AudioAnalysisService
   */
  private readonly spotifyClient: SpotifyClient;

  /**
   * Creates an instance of AudioAnalysisService.
   *
   * @memberof AudioAnalysisService
   */
  constructor() {
    this.spotifyClient = new SpotifyClient();
  }

  /**
   * Get Audio Analysis for a Track
   *
   * @param {string} accessToken
   * @param {string} id
   * @returns
   * @memberof AudioAnalysisService
   */
  public async getTrackAudioAnalysis(
    accessToken: string,
    id: string
  ): Promise<SpotifyAudioAnalysis> {
    let response: AxiosResponse<SpotifyAudioAnalysisAPIResponse>;

    try {
      response = await this.spotifyClient.get<SpotifyAudioAnalysisAPIResponse>(
        `/audio-analysis/${id}`,
        accessToken
      );
    } catch (error) {
      console.error(error);
    }

    const audioAnalysis = SpotifyAudioAnalysis.fromJSON(response.data);

    return audioAnalysis;
  }
}

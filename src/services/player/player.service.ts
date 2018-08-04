import { AxiosResponse } from 'axios';

import { SpotifyCursorBasedPaging } from '../../classes/spotify-cursor-based-paging.class';
import { SpotifyCursorBasedPagingAPIResponse } from '../../interfaces/spotify-cursor-based-paging-api-response.interface';
import { SpotifyClient } from '../../spotify-client.class';
import { SpotifyRepeatState } from '../../types/spotify-repeat-state.type';
import { SpotifyCurrentlyPlaying } from './classes/spotify-currently-playing.class';
import { SpotifyDevice } from './classes/spotify-device.class';
import { SpotifyPlayHistory } from './classes/spotify-play-history.class';
import { SpotifyPlayingContext } from './classes/spotify-playing-context.class';
import { SpotifyCurrentlyPlayingAPIResponse } from './interfaces/spotify-currently-playing-api-response.interface';
import { SpotifyDeviceAPIResponse } from './interfaces/spotify-device-api-response.interface';
import { SpotifyPlayHistoryAPIResponse } from './interfaces/spotify-play-history-api-response.interface';
import { SpotifyPlayingContextAPIResponse } from './interfaces/spotify-playing-context-api-response.interface';

/**
 * PlayerService
 *
 * @export
 * @class PlayerService
 */
export class PlayerService {
  /**
   * Creates an instance of PlayerService.
   *
   * @param {SpotifyClient} spotifyClient
   * @memberof PlayerService
   */
  constructor(private readonly spotifyClient: SpotifyClient) {}

  /**
   * Get a User's Available Devices
   *
   * @returns {Promise<SpotifyDevice[]>}
   * @memberof PlayerService
   */
  public async getAvailableDevices(): Promise<SpotifyDevice[]> {
    let response: AxiosResponse<{ devices: SpotifyDeviceAPIResponse[] }>;

    try {
      response = await this.spotifyClient.get<{
        devices: SpotifyDeviceAPIResponse[];
      }>(`/me/player/devices`);
    } catch (error) {
      console.error(error);
    }

    const devices = response.data.devices.map(device =>
      SpotifyDevice.fromJSON(device)
    );

    return devices;
  }

  /**
   * Get Information About The User's Current Playback
   *
   * @param {string} [market]
   * @returns
   * @memberof PlayerService
   */
  public async getCurrentPlaybackInformations(
    market?: string
  ): Promise<SpotifyPlayingContext> {
    let response: AxiosResponse<SpotifyPlayingContextAPIResponse>;

    try {
      response = await this.spotifyClient.get<SpotifyPlayingContextAPIResponse>(
        `/me/player`
      );
    } catch (error) {
      console.error(error);
    }

    const playingContext = SpotifyPlayingContext.fromJSON(response.data);

    return playingContext;
  }

  /**
   * Get Current User's Recently Played Tracks
   *
   * @param {number} [limit]
   * @param {number} [after]
   * @param {number} [before]
   * @returns {Promise<SpotifyCursorBasedPaging<SpotifyPlayHistory>>}
   * @memberof PlayerService
   */
  public async getUserRecentlyPlayedTracks(
    limit?: number,
    after?: number,
    before?: number
  ): Promise<SpotifyCursorBasedPaging<SpotifyPlayHistory>> {
    let response: AxiosResponse<
      SpotifyCursorBasedPagingAPIResponse<SpotifyPlayHistoryAPIResponse>
    >;

    try {
      response = await this.spotifyClient.get<
        SpotifyCursorBasedPagingAPIResponse<SpotifyPlayHistoryAPIResponse>
      >(`/me/player/recently-played`);
    } catch (error) {
      console.error(error);
    }

    const playHistory = SpotifyCursorBasedPaging.fromJSON<
      SpotifyPlayHistory,
      SpotifyPlayHistoryAPIResponse
    >(
      response.data,
      response.data.items.map(item => SpotifyPlayHistory.fromJSON(item))
    );

    return playHistory;
  }

  /**
   * Get the User's Currently Playing Track
   *
   * @param {string} [market]
   * @returns {Promise<SpotifyCurrentlyPlaying>}
   * @memberof PlayerService
   */
  public async getCurrentlyPlayingTrack(
    accessToken: string,
    market?: string
  ): Promise<SpotifyCurrentlyPlaying> {
    let response: AxiosResponse<SpotifyCurrentlyPlayingAPIResponse>;

    try {
      response = await this.spotifyClient.get<
        SpotifyCurrentlyPlayingAPIResponse
      >(`/me/player/currently-playing`);
    } catch (error) {
      console.error(error);
    }

    const currentlyPlaying = SpotifyCurrentlyPlaying.fromJSON(response.data);

    return currentlyPlaying;
  }

  /**
   * Get the User's Currently Playing Track
   *
   * @param {[string]} deviceID
   * @returns {Promise<void>}
   * @memberof PlayerService
   */
  public async pauseCurrentlyPlayingTrack(deviceID?: string): Promise<void> {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.put<void>(
        `/me/player/pause${deviceID ? `?device_id=${deviceID}` : ''}`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * Seek To Position In Currently Playing Track
   *
   * @param {number} positionMs
   * @param {string} [deviceID]
   * @returns {Promise<void>}
   * @memberof PlayerService
   */
  public async seekToPositionInCurrentlyPlayingTrack(
    positionMs: number,
    deviceID?: string
  ): Promise<void> {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.put<void>(
        `/me/player/seek?position_ms=${positionMs}${
          deviceID ? `&device_id=${deviceID}` : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * Set Repeat Mode On User’s Playback
   *
   * @param {SpotifyRepeatState} state
   * @param {string} [deviceID]
   * @returns {Promise<void>}
   * @memberof PlayerService
   */
  public async setRepeatMode(
    state: SpotifyRepeatState,
    deviceID?: string
  ): Promise<void> {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.put<void>(
        `/me/player/repeat?state=${state}${
          deviceID ? `&device_id=${deviceID}` : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * Set Volume For User's Playback
   *
   * @param {number} volumePercent
   * @param {string} [deviceID]
   * @returns {Promise<void>}
   * @memberof PlayerService
   */
  public async setVolume(
    volumePercent: number,
    deviceID?: string
  ): Promise<void> {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.put<void>(
        `/me/player/volume?volume_percent=${volumePercent}${
          deviceID ? `&device_id=${deviceID}` : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * Skip User’s Playback To Next Track
   *
   * @param {string} [deviceID]
   * @returns {Promise<void>}
   * @memberof PlayerService
   */
  public async nextTrack(deviceID?: string): Promise<void> {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.post<void>(
        `/me/player/next${deviceID ? `?device_id=${deviceID}` : ''}`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * Skip User’s Playback To Previous Track
   *
   * @param {string} [deviceID]
   * @returns {Promise<void>}
   * @memberof PlayerService
   */
  public async previousTrack(deviceID?: string): Promise<void> {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.post<void>(
        `/me/player/previous${deviceID ? `?device_id=${deviceID}` : ''}`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * Start/Resume a User's Playback
   *
   * @param {string} [deviceID]
   * @returns
   * @memberof PlayerService
   */
  public async startOrResumeUserPlayback(deviceID?: string) {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.post<void>(
        `/me/player/play${deviceID ? `?device_id=${deviceID}` : ''}`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * Toggle Shuffle For User’s Playback
   *
   * @param {boolean} state
   * @param {string} [deviceID]
   * @returns {Promise<void>}
   * @memberof PlayerService
   */
  public async toggleShuffle(state: boolean, deviceID?: string): Promise<void> {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.put<void>(
        `/me/player/shuffle?state=${state}${
          deviceID ? `?device_id=${deviceID}` : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * Transfer a User's Playback
   *
   * @param {string} deviceID
   * @param {boolean} [play]
   * @returns {Promise<void>}
   * @memberof PlayerService
   */
  public async transferPlayback(
    deviceID: string,
    play?: boolean
  ): Promise<void> {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.put<void>(`/me/player`, {
        device_ids: [deviceID]
      });
    } catch (error) {
      console.error(error);
    }

    return;
  }
}

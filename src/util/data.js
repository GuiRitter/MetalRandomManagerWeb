export const buildPendingSpotifyIdRow = row => {
	const pendingSpotiyIdRow = {
		matchString: row.match_string,
		album: row.album,
		track: row.track,
		songId: row.song_id,
	};

	if (row.spotify_id) {
		pendingSpotiyIdRow.SpotifyId = row.spotify_id;
	}

	return pendingSpotiyIdRow;
}

export const getPageAmount = (count, pageSize) => Math.ceil(count / pageSize) || 1;

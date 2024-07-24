export const buildPendingSpotifyIdRow = row => {
	if (!row) {
		return row;
	}

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

export const bySimilarity = (alpha, bravo) => (alpha.similarity > bravo.similarity) ? -1 : (alpha.similarity < bravo.similarity) ? 1 : 0;

export const getPageAmount = (count, pageSize) => Math.ceil(count / pageSize) || 1;

/**
 *  https://stackoverflow.com/a/36566052/1781376
 */
export const editDistance = (s1, s2) => {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();

	var costs = [];
	for (var i = 0; i <= s1.length; i++) {
		var lastValue = i;
		for (var j = 0; j <= s2.length; j++) {
			if (i === 0)
				costs[j] = j;
			else {
				if (j > 0) {
					var newValue = costs[j - 1];
					if (s1.charAt(i - 1) !== s2.charAt(j - 1))
						newValue = Math.min(Math.min(newValue, lastValue),
							costs[j]) + 1;
					costs[j - 1] = lastValue;
					lastValue = newValue;
				}
			}
		}
		if (i > 0)
			costs[s2.length] = lastValue;
	}
	return costs[s2.length];
}

/**
 *  https://stackoverflow.com/a/36566052/1781376
 */
export const similarity = (s1, s2) => {
	var longer = s1;
	var shorter = s2;
	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}
	var longerLength = longer.length;
	if (longerLength === 0) {
		return 1.0;
	}
	return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

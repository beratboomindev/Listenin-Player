/**
 * Static sample content for the Phase 2 shell.
 * It exists only to show layout and typography; it is not fake functionality and gets
 * replaced when the real sources land (Spotify in Phase 3, library in Phase 5).
 */
export type SampleArtist = {
  id: string;
  name: string;
};

export type SampleTrack = {
  id: string;
  title: string;
  artist: string;
  kind: string;
  duration: string;
};

export const artists: SampleArtist[] = [
  { id: 'a1', name: 'Harbor Lights' },
  { id: 'a2', name: 'Paper Divers' },
  { id: 'a3', name: 'Velvet Static' },
  { id: 'a4', name: 'Northbound Choir' },
  { id: 'a5', name: 'Slow Transit' }
];

export const tracks: SampleTrack[] = [
  { id: 't1', title: 'Low Tide', artist: 'Harbor Lights', kind: 'Single', duration: '3:42' },
  { id: 't2', title: 'Blue Hour', artist: 'Harbor Lights', kind: 'Album', duration: '4:18' },
  { id: 't3', title: 'Paper Boats', artist: 'Paper Divers', kind: 'Single', duration: '3:07' },
  { id: 't4', title: 'Static Bloom', artist: 'Velvet Static', kind: 'EP', duration: '5:02' },
  { id: 't5', title: 'Northbound', artist: 'Northbound Choir', kind: 'Album', duration: '4:44' },
  { id: 't6', title: 'Last Bus', artist: 'Slow Transit', kind: 'Single', duration: '2:58' }
];

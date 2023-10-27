import mockRocket from "./rocket.mock";

const launcherApiMock = {
  flight_number: 1,
  mission_name: 'Mission Test',
  mission_id: ['1', '2'],
  upcoming: true,
  launch_year: '2023',
  launch_date_unix: 1661730900,
  launch_date_utc: new Date().toISOString(),
  launch_date_local: new Date().toISOString(),
  is_tentative: false,
  tentative_max_precision: 'hour',
  tbd: false,
  launch_site: {
    site_id: 'site-id',
    site_name: 'Site Name',
    site_name_long: 'Site Name Long',
  },
  rocket: mockRocket,
  links: {
    mission_patch: 'Mission Patch',
    mission_patch_small: 'Small Mission Patch',
    reddit_campaign: 'Reddit Campaign',
    reddit_launch: 'Reddit Launch',
    reddit_recovery: 'Reddit Recovery',
    reddit_media: 'Reddit Media',
    presskit: 'Presskit',
    article_link: 'Article Link',
    wikipedia: 'Wikipedia Link',
    video_link: 'Video Link',
    youtube_id: 'YouTube ID',
    flickr_images: ['Image 1', 'Image 2'],
  },
  details: 'Sample details',
  static_fire_date_utc: new Date().toISOString(),
  static_fire_date_unix: 1661730900,
  timeline: { webcast_liftoff: 1234 },
  crew: ['Crew 1', 'Crew 2'],
};

export default launcherApiMock
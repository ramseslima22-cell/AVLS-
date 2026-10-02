import { videos } from './videos';

export const projectCategories = ['Todos', 'Social Media', 'Reels'];

export const projects = videos.map(video => ({
  ...video,
  category: ['3-brinquedos', 'pesa-mais'].includes(video.id) ? 'Social Media' : 'Reels',
  cover: video.thumbnail,
}));

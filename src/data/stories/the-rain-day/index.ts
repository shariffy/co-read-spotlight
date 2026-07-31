import type { StoryDay, StoryPack } from '../../../types/story'
import day1 from './day-1.json'
import day2 from './day-2.json'

export const theRainDay: StoryPack = {
  id: 'the-rain-day',
  title: 'The Rain Day',
  days: [day1 as StoryDay, day2 as StoryDay],
}

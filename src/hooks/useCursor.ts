import MouseFollower from 'mouse-follower';
import { create } from 'zustand';

const useCursor = create(() => ({
  instance: null as MouseFollower | null,
}));

export default useCursor;

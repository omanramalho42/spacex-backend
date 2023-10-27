import { 
  expect, 
  describe, 
  it,
  afterAll,
  beforeAll
} from 'vitest'

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import launcherMock from './mock/lauch.mock'
import rocketMock from '../test/mock/rocket.mock'
// @ts-ignore
import Launcher from '../model/launches.schema';
// @ts-ignore
import Rocket from '../model/rockets.schema';

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { 
    // @ts-ignore
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer && typeof mongoServer.stop === 'function') {
    await mongoServer.stop();
  }
});

describe('Launches', () => {
  it('should create a launch', async () => {

    const launch = new Launcher(launcherMock);
    const savedLaunch = await launch.save();
    expect(savedLaunch.flight_number).toBe(launcherMock.flight_number);
    expect(savedLaunch.mission_name).toBe(launcherMock.mission_name);
  });
});

describe('Rocket', () => {
  it('should create a rocket', async () => {

    const rocket = new Rocket(rocketMock);
    const savedRocket = await rocket.save();
    expect(savedRocket.rocket_id).toBe(rocketMock.rocket_id);
    expect(savedRocket.rocket_name).toBe(rocketMock.rocket_name);
  });
});

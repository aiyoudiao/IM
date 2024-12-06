import { UUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export const getNewGuid = () => uuidv4() as UUID;
import { Test } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let auth: AuthService;
  const users = { findByEmail: jest.fn(), createUser: jest.fn() };
  const jwt = { signAsync: jest.fn() };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: users },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();

    auth = moduleRef.get(AuthService);
    jest.clearAllMocks();
  });

  it('register should create user', async () => {
    users.findByEmail.mockResolvedValue(null);
    users.createUser.mockResolvedValue({ id: '1', email: 'a@b.com' });
    (bcrypt.hash as jest.Mock).mockResolvedValue('hash');

    const res = await auth.register({ username: 'u', email: 'a@b.com', password: '12345678' });
    expect(res.email).toBe('a@b.com');
  });

  it('login should return token', async () => {
    users.findByEmail.mockResolvedValue({ id: '1', email: 'a@b.com', passwordHash: 'hash' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    jwt.signAsync.mockResolvedValue('token');

    const res = await auth.login({ email: 'a@b.com', password: '12345678' });
    expect(res.accessToken).toBe('token');
  });
});
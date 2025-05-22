import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './entities/auth-payload.entity';
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.validateLocalUser(loginInput);

    return await this.authService.login(user);
  }
}

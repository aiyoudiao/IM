# NonIM


https://nx.dev/nx-api/nest

生成应用：
pnpm exec nx generate @nx/nest:application --directory=apps/backend --no-interactive 


生成lib：
pnpm exec nx generate @nestjs/schematics:library --rootDir=packages --name=backend-helper --prefix=@non-im --no-interactive


生成一个增删改查的模块：
pnpm exec nx generate @nestjs/schematics:resource --sourceRoot=./apps/backend/src/modules --name=Cat --crud=true --no-interactive 


## nest 命令

生成一个 provider 服务：
nest g service cats


生成一个 模块：
nest g module cats

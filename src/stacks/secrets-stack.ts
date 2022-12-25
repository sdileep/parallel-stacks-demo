import { Stack, StackProps } from 'aws-cdk-lib';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export interface SecretsStackProps extends StackProps {
  stage: string;
}

export class SecretsStack extends Stack {
  readonly externalApiKeySecret: Secret;

  constructor(scope: Construct, id: string, props: SecretsStackProps) {
    super(scope, id, props);

    this.externalApiKeySecret = new Secret(this, 'ApiKey', {
      description: `External ApiKey for ${props.stage}`,
    });
  }
}

import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    verbose: true,
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true
            }
        ]
    },
    preset: 'ts-jest'
};

export default config;

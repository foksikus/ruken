import Resolver from './resolver/resolver';
import { Scope } from './resolver/scope.type';

const scope: Scope = {
  args: {
    abc: 'abc-variable'
  },
  methods: {
    say: function (...args: unknown[]) {
      console.log('Ich sage: "', ...args, '"');
    },
    eval: () => 'evaluated value'
  }
};

new Resolver(scope).resolve("say('Hallo Welt', abc, 34234, eval())");

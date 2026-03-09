import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import UserPolicy from 'App/Policies/UserPolicy'

// Registra a policy
Bouncer.registerPolicies({
  User: UserPolicy,
})
export let query = `
{
 user {
      id
      login
      attrs
      email
      campus
      profile
      lastName
      firstName
      avatarUrl
      auditRatio
      totalUp
      totalUpBonus
      totalDown
      roles { slug }
      labels { labelName, labelId, eventId }
      records {
        startAt
        endAt
        message
        createdAt
        type { canAccessPlatform, isPermanent, canBeAuditor, label, type }
      }
      transactions (
        order_by: [{ type: desc }, { amount: desc }]
        distinct_on: [type]
      )
      { type, amount }
    }
    }`
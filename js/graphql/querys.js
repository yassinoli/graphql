export let query = `
{
 user {
      id
      login
      attrs
      campus
      lastName
      firstName
      avatarUrl
      auditRatio
      totalUp
      labels { labelName }
      transactions (
        order_by: [{ type: desc }, { amount: desc }]
        distinct_on: [type]
      )
      { type, amount }
    }
    }`


    export let xpandlevel = `{
    xp: transaction_aggregate(
      where: {
        type: { _eq: "xp" }
        eventId: { _eq: 41 }
      }
    ) { aggregate { sum { amount } } }
    level: transaction(
      limit: 1
      order_by: { amount: desc }
      where: {
        type: { _eq: "level" }
        eventId: { _eq: 41 }
      }
    ) { amount }
  }`
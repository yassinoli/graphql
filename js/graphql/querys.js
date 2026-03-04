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

  export let progress = `{
    progress (
      order_by: [{ path: asc} , {createdAt: asc}, {grade: asc }]
      where: {
        _or: [
          {
            event: {
              object: { type: { _eq: "module" } }
            }
          },
          {
            _and: [
              { object: { type: { _eq: "piscine" } } }
              {
                event: {
                  parent: { object: { type: { _eq: "module" } } }
                  parentId: { _eq: 41 }
                }
              }
            ]
          }
        ]
      }
    ) {
      id
      path
      grade
      isDone
      eventId
      version
      createdAt
      updatedAt
    }
  }`

  export let transactions = `{
  transaction(
    where: {
      type: {_eq: "xp"},
      _or: [{object: {type: {_eq: "project"}}}, {object: {type: {_eq: "piscine"}}}]
    }
    order_by: {createdAt: asc}
  ) {
    amount
    object {
      name
    }
  }
} `
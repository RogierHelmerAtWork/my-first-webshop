import { Modules } from "@medusajs/framework/utils"
import { createUserAccountWorkflow } from "@medusajs/medusa/core-flows"

export default async function seedAdmin({ container }: any) {
  const authModuleService = container.resolve(Modules.AUTH)

  // 1. Register the auth identity (email + password)
  const { success, authIdentity, error } = await authModuleService.register("emailpass", {
    url: "",
    headers: {},
    query: {},
    body: {
      email: "admin@parfumproberen.nl",
      password: "SuperSecret123!#$",
    },
    protocol: "https",
  })

  if (!success || !authIdentity) {
    console.error(`Failed to create auth identity, with error: ${error}`)
    return
  }

  // 2. Create the user and associate with auth identity
  const { result: user } = await createUserAccountWorkflow(container).run({
    input: {
      authIdentityId: authIdentity.id,
      userData: {
        email: "admin@parfumproberen.nl",
        first_name: "Admin",
        last_name: "User",
      },
    },
  })

  console.log("Admin user created:", user)
}
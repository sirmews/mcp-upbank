# MCP-Upbank (in progress!)

## A Model Context Protocol server implementation for accessing the Up Bank API

The goal is to test the Up Bank API to see if we can find some use for it in daily LLM usage.
Some ideas:

- Get a list of transactions for the day and add to your daily journaling
- Compare your spending habits across months
- Get Navishkar (the author of this repo) a job so he can make the kind of money that allows him to finally afford his own home in Melbourne

__Note:__ The API does not allow mutations so there's no risk of you accidentally deleting your bank account or sending money to a Nigerian prince.

## How it works

I use the openapi spec found on [Github](https://github.com/up-banking/api) to generate zod schemas and types using [Orval](https://orval.dev/).

Unfortunately, the api uses opaque cursors which means I can't simply use the outputs generated from Orval. 

This is why, for the moment, I'm manually copying some files across and generating a pagination handler myself.

## What's next

- Fix/Enhance Orval's generator to make this a better experience. Or maybe I just need to read their docs better.
- Create prompts that provide instructions on analyzing ingested data. 
- Distribute executables with Homebrew, Chocolatey, apt etc.

Resources:

- [Up Bank API](https://developer.up.com.au/)
- [Up Bank API - Github](https://github.com/up-banking/api)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Orval](https://orval.dev/)

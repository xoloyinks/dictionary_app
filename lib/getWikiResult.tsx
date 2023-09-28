import React from 'react'

export default async function getWikiResult( searchTerm : string ) {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);

  if(!res.ok) throw new Error("Could not Fetch dictionary word")
  
  return res.json();
}

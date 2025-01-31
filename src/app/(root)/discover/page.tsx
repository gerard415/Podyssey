"use client"

import EmptyState from '@/components/EmptyState'
import LoaderSpinner from '@/components/LoaderSpinner'
import PodcastCard from '@/components/PodcastCard'
import { useQuery } from 'convex/react'
import React, { Suspense } from 'react'
import { api } from '../../../../convex/_generated/api'
import Searchbar from '@/components/SearchBar'
import { useSearchParams } from 'next/navigation'

const Page = () => {
  return(
    <Suspense>
      <Discover/>
    </Suspense>
  )
}

export default Page

const Discover = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, { search: search || '' })

  return (
    <div className="flex flex-col gap-9">
      <Searchbar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          {!search ? 'Discover Trending Podcasts' : 'Search results for '}
          {search && <span className="text-white-2">{search}</span>}
        </h1>
        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className="podcast_grid">
              {podcastsData?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                <PodcastCard 
                  key={_id}
                  imgUrl={imageUrl!}
                  title={podcastTitle}
                  description={podcastDescription}
                  podcastId={_id}
                />
              ))}
            </div>
            ) : <EmptyState title="No results found" />}
          </>
        ) : <LoaderSpinner />}
      </div>
    </div>
  )
}

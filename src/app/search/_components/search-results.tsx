'use client'

import { Header } from '@/components/header'
import { PageWrapper } from '@/components/page-wrapper'
import { PerfumeGrid } from '@/components/perfume/perfume-grid'
import { SearchBar } from '@/components/search/search-bar'
import { searchPerfumes } from '@/lib/api/search'
import { perfumeStore } from '@/lib/perfume-store'
import type { ApiPerfume } from '@/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'

export function SearchResults() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const query = searchParams.get('q') ?? ''

	const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ['search', query],
			queryFn: ({ pageParam }) => searchPerfumes(query, 20, pageParam as number),
			initialPageParam: 0,
			getNextPageParam: last => (last.has_more ? last.offset + last.limit : undefined),
			enabled: query.trim().length > 0,
			retry: false,
		})

	const perfumes = data?.pages.flatMap(p => p.perfumes) ?? []
	const total = data?.pages[0]?.total

	function handleSearch(q: string) {
		if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`)
	}

	function handleCardClick(perfume: ApiPerfume) {
		perfumeStore.set(perfume.slug, perfume)
		router.push(`/search/${perfume.slug}`)
	}

	return (
		<PageWrapper>
			<div style={{ padding: '36px 56px 120px' }}>
				<Header />

				<div style={{ maxWidth: 1440, margin: '0 auto 40px' }}>
					<div style={{ maxWidth: 540, marginBottom: 28 }}>
						<SearchBar
							onSearch={handleSearch}
							isLoading={isLoading}
							initialValue={query}
							size="sm"
						/>
					</div>

					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
							borderBottom: '1px solid var(--line)',
							paddingBottom: 22,
						}}
					>
						<div
							style={{
								fontWeight: 700,
								fontSize: 36,
								lineHeight: 1,
								letterSpacing: '-0.025em',
							}}
						>
							<span style={{ color: 'var(--purple)' }}>"</span>
							{query}
							<span style={{ color: 'var(--purple)' }}>"</span>
						</div>
						{!isLoading && total !== undefined && (
							<div
								style={{
									fontSize: 12,
									letterSpacing: '0.18em',
									textTransform: 'uppercase',
									color: 'var(--mute)',
								}}
							>
								{total} RESULTS · SORTED BY MOOD MATCH
							</div>
						)}
					</div>
				</div>

				<div style={{ maxWidth: 1440, margin: '0 auto' }}>
					{isError ? (
						<div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--mute)' }}>
							<p style={{ fontSize: 32, marginBottom: 16 }}>😅</p>
							<p style={{ fontSize: 15 }}>
								{error instanceof Error ? error.message : '검색 중 오류가 발생했습니다.'}
							</p>
						</div>
					) : (
						<PerfumeGrid
							perfumes={perfumes}
							isLoading={isLoading}
							onCardClick={handleCardClick}
							onLoadMore={fetchNextPage}
							hasMore={hasNextPage}
							isLoadingMore={isFetchingNextPage}
						/>
					)}
				</div>

				<button
					aria-label="to top"
					style={{
						position: 'fixed',
						right: 24,
						bottom: 24,
						width: 50,
						height: 50,
						border: 'none',
						borderRadius: '50%',
						background: 'var(--ink)',
						color: 'var(--paper)',
						fontSize: 18,
						display: 'grid',
						placeItems: 'center',
						cursor: 'pointer',
						transition: 'opacity 0.15s',
					}}
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				>
					↑
				</button>
			</div>
		</PageWrapper>
	)
}

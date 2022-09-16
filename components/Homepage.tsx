import { Banner } from 'common/Banner'
import { Footer } from 'common/Footer'
import { Header } from 'common/Header'
import { pubKeyUrl, shortPubKey } from 'common/utils'
import { useAllStakePools } from 'hooks/useAllStakePools'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { FaQuestion } from 'react-icons/fa'

import { GlobalStats } from './GlobalStats'

export function Placeholder() {
  return (
    <div className="h-[300px] animate-pulse rounded-lg bg-white bg-opacity-5 p-10"></div>
  )
}

function Homepage() {
  const { environment } = useEnvironmentCtx()
  const allStakePools = useAllStakePools()
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>Cardinal Staking UI</title>
        <meta name="description" content="Generated by Cardinal Staking UI" />
        <link rel="icon" href={'/favicon.ico'} />
        <script
          defer
          data-domain="stake.cardinal.so"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </Head>

      <div>
        <Banner />
        <GlobalStats />
        <Header />
        <div
          className="container mx-auto w-full px-5"
          style={{ minHeight: 'calc(100vh - 460px)' }}
        >
          <div className="mt-10 mb-5 text-lg font-bold">Stake Pools</div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {!allStakePools.isFetched ? (
              <>
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
              </>
            ) : allStakePools.data &&
              allStakePools.data?.stakePoolsWithMetadata.length > 0 ? (
              allStakePools.data?.stakePoolsWithMetadata.map(
                (stakePool) =>
                  !stakePool.stakePoolMetadata?.hidden && (
                    <div
                      className="flex h-[300px] cursor-pointer flex-col rounded-lg bg-white bg-opacity-5 p-10 transition-all duration-100 hover:scale-[1.01]"
                      onClick={() =>
                        router.push(
                          stakePool.stakePoolMetadata?.redirect ??
                            `/${
                              stakePool.stakePoolMetadata?.name ||
                              stakePool.stakePoolData.pubkey.toString()
                            }${
                              environment.label !== 'mainnet-beta'
                                ? `?cluster=${environment.label}`
                                : ''
                            }`
                        )
                      }
                    >
                      <div className="text-center font-bold">
                        {stakePool.stakePoolMetadata?.displayName}
                      </div>
                      <div className="text-gray text-center">
                        <a
                          className="text-xs text-gray-500"
                          target="_blank"
                          rel="noreferrer"
                          href={pubKeyUrl(
                            stakePool.stakePoolData.pubkey,
                            environment.label
                          )}
                        >
                          {shortPubKey(stakePool.stakePoolData.pubkey)}
                        </a>
                      </div>
                      <div className="flex flex-grow items-center justify-center">
                        {stakePool.stakePoolMetadata?.imageUrl && (
                          <img
                            className="max-h-[150px] rounded-xl"
                            src={stakePool.stakePoolMetadata.imageUrl}
                            alt={stakePool.stakePoolMetadata.name}
                          />
                        )}
                      </div>
                    </div>
                  )
              )
            ) : (
              'No pools found...'
            )}
          </div>
          {allStakePools.data &&
            allStakePools.data.stakePoolsWithoutMetadata.length > 0 && (
              <>
                <div className="mt-10 mb-5 text-lg font-bold">
                  Unrecognized Pools
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                  {allStakePools.data.stakePoolsWithoutMetadata.map(
                    (stakePool) => (
                      <div
                        key={stakePool.stakePoolData.pubkey.toString()}
                        className="flex h-[300px] cursor-pointer flex-col rounded-lg bg-white bg-opacity-5 p-10 transition-all duration-100 hover:scale-[1.01]"
                        onClick={() =>
                          router.push(
                            `/${
                              stakePool.stakePoolMetadata?.name ||
                              stakePool.stakePoolData.pubkey.toString()
                            }${
                              environment.label !== 'mainnet-beta'
                                ? `?cluster=${environment.label}`
                                : ''
                            }`
                          )
                        }
                      >
                        <div className="text-center font-bold text-white">
                          <a
                            className="text-white"
                            target="_blank"
                            rel="noreferrer"
                            href={pubKeyUrl(
                              stakePool.stakePoolData.pubkey,
                              environment.label
                            )}
                          >
                            {shortPubKey(stakePool.stakePoolData.pubkey)}
                          </a>
                        </div>
                        <div className="text-gray text-center">
                          <a
                            className="text-xs text-gray-500"
                            target="_blank"
                            rel="noreferrer"
                            href={pubKeyUrl(
                              stakePool.stakePoolData.pubkey,
                              environment.label
                            )}
                          >
                            {shortPubKey(stakePool.stakePoolData.pubkey)}
                          </a>
                        </div>
                        <div className="flex flex-grow items-center justify-center">
                          <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-white bg-opacity-5 text-5xl text-white text-opacity-40">
                            {/* {shortPubKey(stakePool.stakePoolData.pubkey)} */}
                            <FaQuestion />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Homepage

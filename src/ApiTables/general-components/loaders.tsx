import * as React from "react"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function TableLoader({ count }: any) {
    return (
        <SkeletonTheme
            baseColor='#f5f5f5' highlightColor='#eee'
        >
            <div className='w-100 P-4'>
                <p className='mb-0 p-2'>
                    <Skeleton count={count} height={50} />
                </p>
            </div>
        </SkeletonTheme>
    );
}

export function DashboardCardLoader() {
    return (
        <SkeletonTheme
            baseColor='#eee'
            highlightColor='#fff'
        >
            <div className='W-100 P-4'>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <Skeleton height={15} style={{ width: '15rem' }} />
                    <Skeleton height={15} style={{ width: '3rem' }} />
                </div>
                <p className='mb-0'>
                    <Skeleton count={12} height={30} style={{ marginBottom: '0.1rem' }} />
                </p>
            </div>
        </SkeletonTheme>
    );
}

export function PieChartLoader() {

    return (
        <SkeletonTheme
            baseColor='#eee'
            highlightColor='#fff'
        >
            <div className='W-100 P-4'>
                <div className='row gx-2 mb-4'>
                    <div className='col-6'>
                        <Skeleton height={35} style={{ margin: '0.5rem' }} />
                    </div>
                    <div className='col-6'>
                        <Skeleton height={35} style={{ margin: '0.5rem' }} />
                    </div>
                </div>
                <div className='row align-items-center gy-4 mb-1'>
                    <div className='col-lg-5'>
                        <div className='position-relative' style={{ width: '100%', paddingBottom: '100%' }}>
                            <Skeleton
                                style={{
                                    width: '100%',
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    right: '0',
                                    bottom: '0',
                                    height: '100%',
                                    borderRadius: '50%',
                                }}
                            />
                        </div>
                    </div>
                    <div className='col-lg-6 ms-auto'>
                        <Skeleton height={25} style={{ marginBottom: '0.15rem' }} />
                        <Skeleton height={25} style={{ marginBottom: '0.15rem' }} />
                        <Skeleton height={25} style={{ marginBottom: '0.15rem' }} />
                        <Skeleton height={25} style={{ marginBottom: '0.15rem' }} />
                    </div>
                </div>
                <div className='d-flex align-items-end flex-column'>
                    <Skeleton height={15} style={{ marginBottom: '0.15rem', width: '5rem' }} />
                    <Skeleton height={25} style={{ marginBottom: '0.15rem', width: '10rem' }} />
                </div>
            </div>
        </SkeletonTheme>
    );
}

import squaredNorm from './squaredNorm';
export default function norm(A) {
    return squaredNorm(A).sqrt();
}

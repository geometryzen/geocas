export default function squaredNorm(A) {
    return A.scp(A.rev());
}

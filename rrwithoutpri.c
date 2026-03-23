#include <stdio.h>

int main() {
    int n, q, t=0, c=0, b[10], r[10], w[10], at[10], ct[10], d[10]={0};
    float wt=0, tat=0;
    int gp[100], gs[100], ge[100], gi=0;
    
    printf("Processes: "); scanf("%d",&n);
    for(int i=0;i<n;i++) {
        printf("P%d AT BT: ",i+1);
        scanf("%d%d",&at[i],&b[i]);
        r[i]=b[i];
    }
    printf("Quantum: "); scanf("%d",&q);
    
    printf("\nGantt:\n");
    while(c<n) {
        int exec=0;
        for(int i=0;i<n;i++) {
            if(r[i]>0 && at[i]<=t && !d[i]) {
                exec=1;
                int start=t;
                printf("|P%d(%d",i+1,t);
                if(r[i]>q) {
                    t+=q;
                    r[i]-=q;
                } else {
                    t+=r[i];
                    ct[i]=t;
                    w[i]=t-b[i]-at[i];
                    r[i]=0;
                    d[i]=1;
                    c++;
                }
                printf("-%d)",t);
                gp[gi]=i+1; gs[gi]=start; ge[gi]=t; gi++;
            }
        }
        if(!exec) {
            int next=9999;
            for(int i=0;i<n;i++) if(r[i]>0 && at[i]<next) next=at[i];
            t=next;
        }
    }
    
    printf("|\n\n");
    for(int i=0;i<gi;i++) printf("|P%d ",gp[i]);
    printf("|\n");
    for(int i=0;i<gi;i++) printf("%d   ",gs[i]);
    printf("%d\n\n",t);
    
    printf("P\tAT\tBT\tCT\tWT\tTAT\n");
    for(int i=0;i<n;i++) {
        int ta=b[i]+w[i];
        wt+=w[i]; tat+=ta;
        printf("P%d\t%d\t%d\t%d\t%d\t%d\n",i+1,at[i],b[i],ct[i],w[i],ta);
    }
    printf("\nAvg WT: %.2f\nAvg TAT: %.2f\n",wt/n,tat/n);
}

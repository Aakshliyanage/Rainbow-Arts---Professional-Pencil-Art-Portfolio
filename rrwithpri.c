#include <stdio.h>

int main() {
    int n, q, time = 0, completed = 0;
    int b[10], r[10], w[10], at[10], p[10], done[10] = {0};
    float wt = 0, tat = 0;
    int gantt_p[100], gantt_start[100], gantt_end[100], gantt_count = 0;
    
    printf("Enter processes: ");
    scanf("%d", &n);
    
    for(int i = 0; i < n; i++) {
        printf("P%d AT BT PRI: ", i+1);
        scanf("%d%d%d", &at[i], &b[i], &p[i]);
        r[i] = b[i];
    }
    
    printf("Time quantum: ");
    scanf("%d", &q);
    
    printf("\nGantt Chart:\n");
    
    while(completed < n) {
        int high = 9999, sel = -1;
        
        for(int i = 0; i < n; i++)
            if(r[i] > 0 && at[i] <= time && !done[i] && p[i] < high)
                high = p[i], sel = i;
        
        if(sel != -1) {
            int start = time;
            if(r[sel] > q) {
                time += q;
                r[sel] -= q;
            } else {
                time += r[sel];
                w[sel] = time - b[sel] - at[sel];
                r[sel] = 0;
                done[sel] = 1;
                completed++;
            }
            gantt_p[gantt_count] = sel + 1;
            gantt_start[gantt_count] = start;
            gantt_end[gantt_count] = time;
            gantt_count++;
        } else {
            int next = 9999;
            for(int i = 0; i < n; i++)
                if(r[i] > 0 && at[i] < next) next = at[i];
            time = next;
        }
    }
    
    // Print Gantt Chart with time frames
    for(int i = 0; i < gantt_count; i++)
        printf("| P%d ", gantt_p[i]);
    printf("|\n");
    
    for(int i = 0; i < gantt_count; i++)
        printf("%d    ", gantt_start[i]);
    printf("%d\n", time);
    
    // Print results
    printf("\nP\tAT\tBT\tPRI\tWT\tTAT\n");
    for(int i = 0; i < n; i++) {
        int t = b[i] + w[i];
        wt += w[i];
        tat += t;
        printf("P%d\t%d\t%d\t%d\t%d\t%d\n", i+1, at[i], b[i], p[i], w[i], t);
    }
    
    printf("\nAvg WT: %.2f\nAvg TAT: %.2f\n", wt/n, tat/n);
    return 0;
}

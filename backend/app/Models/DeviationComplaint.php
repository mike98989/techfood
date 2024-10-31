<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DeviationComplaint extends Model
{
    use HasFactory;
    protected $guarded = [];
    

    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id','id');
    }
}
